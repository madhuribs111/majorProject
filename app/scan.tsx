import React, { useState, useRef } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { Button, Dialog } from '@rneui/themed';
import { RNCamera, Barcode } from 'react-native-camera'; // Import Barcode type
import { useRouter } from 'expo-router';

export default function Scan() {
    const [barValue, setBarValue] = useState<string>('');
    const [barType, setBarType] = useState<string>('');
    const [flash, setFlash] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const cameraRef = useRef<RNCamera | null>(null); // Reference to the camera
    const router = useRouter();

    // Define the type of barcodes parameter
    const onBarcodesDetected = ({ barcodes }: { barcodes: Barcode[] }) => {
        if (barcodes.length > 0) {
            setBarValue(barcodes[0].data);
            setBarType(barcodes[0].format);
            setShowDialog(true);
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                captureAudio={false}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                onGoogleVisionBarcodesDetected={onBarcodesDetected}
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                }}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <Button
                title={`Flash ${flash ? 'OFF' : 'ON'}`}
                onPress={() => setFlash(!flash)}
                buttonStyle={styles.flashButton}
            />
            <Dialog
                isVisible={showDialog}
                onBackdropPress={() => setShowDialog(false)}
            >
                <Dialog.Title title="Scanned QR Code" />
                <Text style={{ color: '#000', fontSize: 20 }}>
                    {`Data: ${barValue}\nFormat: ${barType}`}
                </Text>
                <Dialog.Actions>
                    <Dialog.Button title="Scan Again" onPress={() => setShowDialog(false)} />
                    <Dialog.Button title="Go Back" onPress={() => router.push('/home')} />
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashButton: {
        backgroundColor: '#0C8E4E',
        marginTop: 20,
    },
});
