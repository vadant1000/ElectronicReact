import React, {useEffect, useState} from "react";
import {
    delOrderAction,
    setGroupsAction, setIdAction,
    setOrderAction,
    setSumAction,
    useData, useId,
    useOrder, useStaff,
    useToken
} from "../../slices/dataSlice";
import {Col, Row} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Route, Switch} from "react-router-dom";
import GroupPage from "../GroupPage/GroupPage";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import axios from "axios";
import Form from "react-bootstrap/Form";

function GenOrderPage() {
    const token = useToken();
    const id = useId();
    const staff = useStaff();
    let [order, setOrders] = useState([]);


    const config = {
        headers: { Authorization: `JWT ${token.payload}` }
    };

    // if (staff){
    //     setUrl(`http://127.0.0.1:8000/order/`);
    // }
    // else{
    //     setUrl(`http://127.0.0.1:8000/order/?user_id=${id.payload}`);
    // }


    // async function fetchData() {
    //     const response = await axios.get(`http://127.0.0.1:8000/order/?user_id=${id.payload}`);
    //     setOrders(response.data);
    // }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/order/`, config).then((response) => {setOrders(response.data);})
    }, [])



    console.log(id.payload)
    return(
        <Container>
            <div>
                <Row xs={1} md={1} className="g-4">
                    {order.map((item)=>{
                        return(

                            <Col key={item.id}>
                                <Card style={{ width: '30rem' }}>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Card.Text>{item.name}</Card.Text>
                                        <Card.Text>Филиал: {item.branch}</Card.Text>
                                        <Card.Text>
                                            Адрес: {item.adress}
                                        </Card.Text>
                                        <Card.Text>
                                            Курс: {item.course}
                                        </Card.Text>
                                        <Card.Text>
                                            День: {item.day}
                                        </Card.Text>
                                        <Card.Text>
                                            Время: {item.time}
                                        </Card.Text>
                                        <Card.Text>
                                            Количество занятий к покупке: {item.quantity_lessons}
                                        </Card.Text>

                                        <Card.Text> Стоимость заказа: {item.quantity_lessons*item.price}</Card.Text>
                                        <Card.Text>Статус заказа: {item.status}</Card.Text>
                                        <Card.Text>Дата заказа: {item.time_create}</Card.Text>

                                    </Card.Body>
                                </Card>

                            </Col>
                        )
                    })}
                </Row>
            </div>
        </Container>
    );

}

export default GenOrderPage;