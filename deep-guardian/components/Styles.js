import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  general: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 50,
    gap: 10,
    color: "white",
    backgroundColor: "white",
    flexShrink: 0,
  },
  Card: {
    width: 393,
    height: 370,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Card_reservas_ejemplo: {
    width: 370,
    height: 130,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 40,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    position: 'relative', 
    borderRightWidth: 2,     
    borderRightColor: 'black', 
  },
  Card_reservas: {
    width: 393,
    height: 620,
    position: "relative", 
    top: -100, 
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo_deep_foto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 393,
    height: 70,
    top:-75,
    backgroundColor: "white",
    borderRadius: 10,
    position: 'relative',
  },
    nombre_pag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 393,
    height: 70,
    top:-90,
    backgroundColor: "white",
    borderRadius: 10,
    position: 'relative',
  },

  bottomBar: {  //lA BARRA DE NAVEGACIÓN WAZAA
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom:-70, 
    height: 60,
    width: 393,
    backgroundColor: "white",
    borderTopColor: "#ccc",
    position: "absolute",
  },
  scrollContainer: {
    padding: 10,
  },
  Logo: {
    width: 333,
    height: 133,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
  },
  buttonBlack: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 10,
  },
  buttonBlack_ch: {  
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 28,
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 8,
  },
  
  buttonWhite: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textbuttonBlack: {
    fontFamily: "Poppins-Regular",
    fontSize: 20, 
    color: "white",
    marginRight: 5,
  },
  textbuttonBlack_ch: {
    fontFamily: "Poppins-Regular",
    fontSize: 13, 
    color: "white",
    marginRight: 5,
  },
  textbuttonWhite: {
    fontFamily: "Poppins-Regular", 
    fontSize: 20,
    color: "black",
    marginRight: 5,
  },
  textoLogo: {
    color: "#000",
    fontFamily: "Poppins-Regular", 
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 41,
    letterSpacing: 0.4,
  },
  textoLogoGrande: {
    alignSelf: "stretch",
    color: "#000",
    fontFamily: "Poppins-Bold", 
    fontSize: 50,
    fontWeight: "700",
    lineHeight: 50,
    letterSpacing: 0.4,
  },
  CardForms: {
    width: 333,
    height: 231,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 15,
    alignSelf: "stretch",
  },
  Bold: {
    color: "#262526",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  BottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
    marginLeft: 20,
  },
  input: {
    borderColor: "#262526", 
    alignItems: "center",
    height: 42,
    width: 333,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default styles;
