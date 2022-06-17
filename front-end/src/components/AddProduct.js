import {Button, Form, Input, InputNumber, Layout, Menu, Row, Select} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, loadingProducts} from "../redux/actions";
import {useNavigate} from "react-router-dom";
import {Option} from "antd/es/mentions";
// import {Option} from "antd/es/mentions";

const productTypeData = ['Book', 'DVD', 'Furniture'];

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    const [form] = Form.useForm();
    const [productType, setProductType] = useState();
    const onFinish = (values) => {
        dispatch(createProduct(values))
        navigate('/');
    };
    const submitForm = () => {
        form.submit();
    }
    const handleOnChange = (value) => {
        console.log(value)
        setProductType(value)
    }
    useEffect(() => {
        dispatch(loadingProducts())
    }, [dispatch])
    const productTypeSpecific = () => {
        switch (productType) {
            case 'DVD':
                return (
                    <Form.Item
                        label="size (MB)"
                        name="size"
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input your size!'
                                },
                                {
                                    type: 'number',
                                    min: 1,
                                    message: 'Please input your size bigger than zero!'
                                },

                            ]
                        }
                    >
                        <InputNumber id={'size'}/>
                    </Form.Item>
                )
            case 'Book':
                return (
                    <Form.Item
                        label="Weight (KG)"
                        name="weight"
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input your weight!'
                                },
                                {
                                    type: 'number',
                                    min: 1,
                                    message: 'Please input your weight bigger than zero!'
                                }
                            ]
                        }
                    >
                        <InputNumber id={'weight'}/>
                    </Form.Item>
                )
            case  'Furniture':
                return (
                    <>
                        <Form.Item
                            label="Height (CM)"
                            name="height"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your height!'
                                    },
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Please input your height bigger than zero!'
                                    }
                                ]
                            }
                        >
                            <InputNumber id={'height'}/>
                        </Form.Item>
                        <Form.Item
                            label="Width (CM)"
                            name="width"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your width!'
                                    },
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Please input your width bigger than zero!'
                                    }
                                ]
                            }
                        >
                            <InputNumber id={'width'}/>
                        </Form.Item>
                        <Form.Item
                            label="Length (CM)"
                            name="length"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your length!'
                                    },
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Please input your length bigger than zero!'
                                    }
                                ]
                            }
                        >
                            <InputNumber id={'length'}/>
                        </Form.Item>
                    </>
                )
            default:
                return ''
        }
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
                        <Title>Product Add</Title>
                        <Menu
                            style={{minWidth: "15%"}}
                            mode="horizontal"
                        >
                            <Menu.Item key="save">
                                <Button onClick={submitForm}>
                                    Save
                                </Button>
                            </Menu.Item>
                            <Menu.Item key="cancel">
                                <Button>
                                    <Link to={`/`}>Cancel</Link>
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Row>
                </Header>
                <Content style={{margin: '0 5%', backgroundColor: "#fff", borderBottom: "2px solid black"}}>
                    <Form
                        labelCol={{span: 2}}
                        wrapperCol={{span: 4}}
                        form={form}
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="off"
                        id={'product_form'}
                    >
                        <Form.Item
                            label="SKU"
                            name="sku"
                            rules={
                                [
                                    {
                                        validator: (_, value) => products.filter(item => item.sku.toLowerCase() == value.toLowerCase()).length ? Promise.reject(new Error('Sku is already exists!')) : Promise.resolve()
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your SKU!'
                                    },
                                ]
                            }
                        >
                            <Input id={'sku'}/>
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true, message: 'Please input your name!'}]}
                        >
                            <Input id={'name'}/>
                        </Form.Item>
                        <Form.Item
                            label="Price ($)"
                            name="price"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your price!'
                                    },
                                    {
                                        type: 'number',
                                        min: 1,
                                        message: 'Please input your price bigger than zero!'
                                    }
                                ]
                            }
                        >
                            <InputNumber id={'price'}/>
                        </Form.Item>
                        <Form.Item
                            label="Type Switcher"
                            name="productType"
                            rules={[{required: true, message: 'Please input your product type!'}]}
                        >
                            <Select name="productType" id="productType" onChange={handleOnChange}>
                                {
                                    productTypeData.map(data => (
                                            <Option key={data} value={data}>{data}</Option>
                                        )
                                    )
                                }
                            </Select>
                        </Form.Item>
                        {
                            productTypeSpecific()
                        }
                    </Form>
                </Content>
                <Footer style={{textAlign: "center", backgroundColor: "#fff"}}>
                    Scandiweb Test assigment
                </Footer>
            </Layout>
        </>
    )
}

export default AddProduct;