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
            <Layout style={{minHeight: 1000}}>
                <Header>
                    <Row justify={'space-between'}>
                        <Title style={{color: 'white', maxHeight: 64}}>Product List</Title>
                        <Menu
                            style={{maxHeight: 64}}
                            theme="dark"
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
                <Content style={{padding: '2% 10%', margin: '3% 0', backgroundColor: "#fff"}}>
                    <Row gutter={[16, 16]}>
                        {
                            <Products/>
                        }
                    </Row>
                </Content>
                <Footer style={{textAlign: "center"}}>Scandiweb Test assigment</Footer>
            </Layout>

        </>
    )
}

export default ProductList;