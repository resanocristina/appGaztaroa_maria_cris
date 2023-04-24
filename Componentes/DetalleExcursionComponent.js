import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView, FlatList} from 'react-native';
import { Card } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios
    }
}

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
                    <Card.Title style={styles.title}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}>
                </Icon>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }

}

function RenderComentario(props) {
    const comentarios = this.props.comentarios.comentarios

    const renderCommentarioItem = ({ item, index }) => {

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <SafeAreaView style={{ flex: 1 }}>
                {comentarios.map((item, index) => (
                    <View key={index} style={{ margin: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.comentario}</Text>
                        <Text style={{ fontSize: 14 }}>{item.autor} </Text>
                        <Text style={{ fontSize: 12 }}>{item.dia} </Text>
                        <Text style={{ fontSize: 12 }}>Valoración: {item.valoracion}/10</Text>
                    </View>
                ))}
            </SafeAreaView>
        </Card>
    );
}

class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []
        };

    }

    marcarFavorito(excursionId) {
        this.setState({
            favoritos: this.state.favoritos.concat(excursionId
            )
        });
    }

    render() {
        const { excursionId } = this.props.route.params;

        return (
            <ScrollView>
                <RenderExcursion 
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                 <RenderComentario
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                 />
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
    },

});
}
export default connect(mapStateToProps)(DetalleExcursion);
