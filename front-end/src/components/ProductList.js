import {Button, Layout, Menu, Row} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import {Link} from "react-router-dom";
import Title from "antd/es/typography/Title";
import Products from "./Products";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, removeProductForDelete} from "../redux/actions";


const ProductList = () => {
    const dispatch = useDispatch();
    const productsForDelete = useSelector(state => state.products.productsForDelete);

    function massDelete() {
        dispatch(deleteProduct(productsForDelete))
        productsForDelete.forEach(item => dispatch(removeProductForDelete(item)));
    }

    return (
        <>
            <Layout style={{minHeight: 1000, backgroundColor: "#fff"}}>
                <Header style={
                    {
                        borderBlock: "none",
                        backgroundColor: "#fff",
                        margin: '2% 5%',
                    }
                }>
                    <Row justify={'space-between'} style={{borderBottom: "2px solid black"}}>
                        <Title>Product List</Title>
                        <Menu
                            mode="horizontal"
                        >
                            <Menu.Item key="add">
                                <Button>
                                    <Link to={`/addproduct`}>
                                        ADD
                                    </Link>
                                </Button>
                            </Menu.Item>
                            <Menu.Item key="massDelete">
                                <Button onClick={massDelete}>
                                    MASS DELETE
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Row>
                </Header>
                <Content style={{margin: '0 5%', backgroundColor: "#fff", borderBottom: "2px solid black"}}>
                    <Row gutter={[16, 16]}>
                        {
                            <Products/>
                        }
                    </Row>
                </Content>
                <Footer style={{textAlign: "center", backgroundColor: "#fff"}}>Scandiweb Test assigment</Footer>
            </Layout>

        </>
    )
}

export default ProductList;