import { StyleSheet, Text, View,Button, Image } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");

  const camera = useRef(null);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setCameraPermission(true);
    }
  };

  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
    {cameraPermission ?
      (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 4, minWidth: "100%" }} ref={camera} />
          <View>
            <Button title="Take Photo" onPress={snap} />
          </View>
          <View style={{ flex: 4 }}>
            {
              photoName
                ? <Image style={{ flex: 1 }} source={{ uri: photoName }} />
                : <Text style={{ flex: 1 }}>File</Text>
            }
            {
              photoBase64
                ? <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${photoBase64}` }} />
                : <Text style={{ flex: 1 }} >Base64 encoded picture</Text>
            }
          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
