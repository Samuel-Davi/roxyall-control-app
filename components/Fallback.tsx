import { Dimensions, Image, Text, View } from "react-native";

const logoImage  = require('@/assets/images/favicon.png')
const { height, width } = Dimensions.get('window')

export const Fallback = () => {

  return (
    <View style={{ height:height, justifyContent: 'center' ,gap: height*0.025, borderColor: 'black', borderWidth:1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Substitua pelo caminho real do seu logo */}
      <Image 
        source={logoImage} 
        alt="Logo da Aplicação" 
        style={{ width: width*0.4, height:height*0.2}} 
      />
      <Text style={{fontSize: 28, alignSelf:'center', textAlign:'center'}}>Aguarde um momento enquanto os dados são carregados...</Text>
    </View>
  );
};