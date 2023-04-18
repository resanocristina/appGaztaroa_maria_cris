import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { ScrollView, FlatList} from 'react-native';
import { COMENTARIOS } from '../comun/comentarios';
import { Icon } from '@rneui/themed';

function RenderExcursion(props) {

    const excursion = props.excursion;
    const comentarios = props.comentarios;

    if (excursion != null) {
        return (   
            <Card>
                <Card.Divider />
                <Card.Image source={require('./imagenes/40Años.png')}>
                    <Card.Title style={styles.title}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon>
                    name={ props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                </Icon>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
     
}

function RenderComentario(props) {
    const comentarios = props.comentarios;
    const renderCommentarioItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 16 ,fontWeight: 'bold'}}>{item.comentario}</Text>
                <Text style={{ fontSize: 14 }}>{item.autor} </Text>
                <Text style={{ fontSize: 12 }}>{item.dia} </Text>
                <Text style={{ fontSize: 12 }}>Valoración: {item.valoracion}/10</Text>
            </View>
        );
    };
    
    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider/>
            <FlatList
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            /> 
        </Card>
    );
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        };
           
    }

    marcarFavorito(excursionId) {
        this.setState({favoritos: this.state.favoritos.concat(excursionId
       )});
    }

    render() {
        const { excursionId } = this.props.route.params;
           
        return (
            <ScrollView>
                <RenderExcursion 
                    excursion={this.state.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                 <RenderComentario
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                 />
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'chocolate',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
    },

});

export default DetalleExcursion;