import React from 'react';
import {View,Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class AddStudentPanel extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            panel: props.panel
        }
    }

    render(){
        return(
                <View style={styles.centeredView}>
                    <View style={styles.panel}>
                        <Text style={{fontSize: 24,marginBottom:10}}>Agregar estudiante</Text>
                        <View>
                            <View style={styles.inputGroup}>
                                <TextInput 
                                    placeholder="Nombre:"
                                />
                            </View>
                        </View>
                        <View>
                            <View style={[styles.inputGroup,{marginBottom:30}]}>
                                <TextInput 
                                    placeholder="Identidad:"
                                />
                            </View>
                        </View>
                        <View style={styles.BtnGroup}>
                            <TouchableOpacity 
                                style={[styles.Btn,{
                                    marginRight:'auto'
                                }]}
                                onPress={()=>this.props.ClosePanel()}
                            >
                                <Text style={{
                                    color:"white",
                                    fontSize: 19,
                                    fontWeight:'bold'
                                }}>Cerrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.Btn,{
                                    backgroundColor: "#3D6DCC",
                                }]}
                            >
                                <Text style={{
                                    color:"white",
                                    fontSize: 19,
                                    fontWeight:'bold'
                                }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    panel: {
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin:10,
        backgroundColor: 'white',
        borderRadius: 4,
        width: '70%',
        top: 100,
    },
    BtnGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent:'flex-end'
    },
    Btn: {
        backgroundColor: "#cc3d6d",
        width: 100,
        padding:13,
        borderRadius:4,
        alignItems: 'center',
        justifyContent: 'center',
        left:0
    },
    inputGroup: {
        padding: 10,
        backgroundColor: "#efefef",
        borderRadius: 4,
        marginBottom: 10,
    }
})