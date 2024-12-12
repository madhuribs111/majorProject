import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import MyButton from "@/components/MyButton";
import { useRoute } from "@react-navigation/native";
import OnBoarding from "../components/onBoarding.jsx"
const Index = () => {
  //useRouter for linking diferent pages

  const router = useRouter();
  const onContinue = () => {
    router.navigate("/login");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <OnBoarding/>
      {/* <MyButton 
      title={"Skip to Login"} 
      onPress={onContinue}></MyButton> */}
    </View>
  );
};
export default Index;
