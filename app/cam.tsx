import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Modal, Text, Button, Alert } from "react-native";
import { CameraView } from "expo-camera"; // Replace if you're using a different camera package
import { useRouter } from "expo-router";
import { Overlay } from "./Overlay";
import axios from "axios";
import { API_URL } from "./login";
import { getFromSecureStore } from "./util/secureStore"; // To get data from secure storage

const Cam = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
  const [scannedData, setScannedData] = useState<string>(""); // Stores scanned QR code data
  const qrLock = useRef(false); // Prevents duplicate scans
  const router = useRouter(); // Router for navigation
  const [authToken, setAuthToken] = useState<string | null>(null); // State to store authToken
  const [username, setUsername] = useState<string | null>(null); // State to store username

  // Fetch authToken and username from secure storage when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = await getFromSecureStore("authToken");
      const user = await getFromSecureStore("username");
      setAuthToken(token);
      setUsername(user);
    };
    fetchData();
  }, []);

  const handleQrCodeScanned = async ({ data }: { data: string }) => {
    if (!qrLock.current) {
      qrLock.current = true;
      console.log("Raw Scanned Data:", data);
      const cleanedData = data.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();  // Remove zero-width characters

  console.log("data type: ",typeof data)
  
      try {
        // Try to parse the data as JSON
        let parsedData;
        try {
          parsedData = JSON.parse(cleanedData); // Parse JSON if possible
          console.log("json type?: ",typeof parsedData);
          console.log("parsed data: ",parsedData);
        } catch (e) {
          console.warn("Failed to parse data as JSON, sending as raw string:", e);
          //parsedData = { sensor_data: data }; // Fallback: send raw string as a sensor_data key
        }
  
        // Prepare the request body with parsed data, username, and authToken
        const requestData = {
          ...parsedData, // Either parsed JSON data or raw data under the 'sensor_data' key
          username: username,
          authToken: authToken,
        };
  
        // Send the data to the backend using PUT request
        const response = await axios.put(
          `${API_URL}/user/register_sensor`,
          parsedData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          console.log("Sensor data registered successfully.");
        } else {
          console.error("Failed to register sensor data:", response.status);
          Alert.alert("Error", "Failed to register sensor data.");
        }
  
        // Display parsed or raw data in the modal
        setScannedData(JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.warn("Error during QR scan handling:", e);
        setScannedData(data); // Fallback to raw data in case of error
        Alert.alert("Error", "Failed to register sensor data.");
      }
  
      setModalVisible(true); // Show modal regardless of parsing success
    }
  };
  

  const handleModalClose = () => {
    setModalVisible(false);
    qrLock.current = false; // Reset lock after closing modal
  };

  const handleGoBack = () => {
    router.push({
      pathname: "/home",
      params: { scannedData }, // Pass scanned data as query parameter
    });
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleQrCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Focus on QR codes only
        }}
      />
      <Overlay />
      {/* Modal for displaying QR data */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Scanned QR Code Data</Text>
            <Text style={styles.modalText}>{scannedData}</Text>
            <Button
              title="Close"
              onPress={() => {
                handleModalClose();
                handleGoBack(); // Navigate back to Home after scanning
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Cam;



















// import React, { useRef, useState } from "react";
// import { StyleSheet, View, Modal, Text, Button, Alert } from "react-native";
// import { CameraView } from "expo-camera"; // Replace if you're using a different camera package
// import { useRouter } from "expo-router";
// import { Overlay } from "./Overlay";
// import axios from "axios";
// import { API_URL } from "./login";
// import { getFromSecureStore } from "./util/secureStore";


// const Cam = () => {
//   const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility
//   const [scannedData, setScannedData] = useState<string>(""); // Stores scanned QR code data
//   const qrLock = useRef(false); // Prevents duplicate scans
//   const router = useRouter(); // Router for navigation
//   const handleQrCodeScanned = async ({ data }: { data: string }) => {
//     if (!qrLock.current) {
//       qrLock.current = true;
//       console.log("Raw Scanned Data:", data);
  
//       try {
        
//       await axios.put(`${API_URL}/user/register_sensor`, {data})
//         const jsonData = JSON.parse(data); // Parse JSON if possible
//         console.log(getFromSecureStore("username"));
//         console.log("Parsed JSON:", jsonData);
//         setScannedData(JSON.stringify(jsonData, null, 2));
//       } catch (e) {
//         console.warn("Failed to parse JSON, using raw data:", e);
//         setScannedData(data); // Fallback to raw data
//       }
  
//       setModalVisible(true); // Show modal regardless of parsing success
//     }
//   };
  

//   const handleModalClose = () => {
//     setModalVisible(false);
//     qrLock.current = false; // Reset lock after closing modal
//   };

//   const handleGoBack = () => {
//     router.push({
//       pathname: "/home",
//       params: { scannedData }, // Pass scanned data as query parameter
//     });
//   };

//   return (
//     <View style={StyleSheet.absoluteFillObject}>
//       <CameraView
//         style={StyleSheet.absoluteFillObject}
//         facing="back"
//         onBarcodeScanned={handleQrCodeScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr"], // Focus on QR codes only
//         }}
//       />
// <Overlay></Overlay>
//       {/* Modal for displaying QR data */}
//       <Modal
//         animationType="slide"
//         transparent
//         visible={modalVisible}
//         onRequestClose={handleModalClose}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Scanned QR Code Data</Text>
//             <Text style={styles.modalText}>{scannedData}</Text>
//             <Button
//               title="Close"
//               onPress={() => {
//                 handleModalClose();
//                 handleGoBack(); // Navigate back to Home after scanning
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
// });

// export default Cam;
