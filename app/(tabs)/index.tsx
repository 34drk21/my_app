import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  useEffect(() => {
    if (!permission) return;

    if (!permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const openCamera = useCallback(async () => {
    const response = permission ?? (await requestPermission());

    if (response?.granted) {
      setIsCameraVisible(true);
    }
  }, [permission, requestPermission]);

  return (
    <ThemedView style={styles.container}>
      {!isCameraVisible && (
        <>
          <ThemedText type="title">タイトル画面</ThemedText>
          <Pressable style={styles.button} onPress={openCamera}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              カメラ
            </ThemedText>
          </Pressable>
        </>
      )}

      {isCameraVisible && (
        <ThemedView style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing="back" />
          <Pressable style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
            <ThemedText style={styles.closeButtonText}>閉じる</ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
  },
  cameraContainer: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: 16,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
