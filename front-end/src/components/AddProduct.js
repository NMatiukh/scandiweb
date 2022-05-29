import {Button, Form, Input, InputNumber, Layout, Menu, Row, Select} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, loadingProducts} from "../redux/actions";
import {useNavigate} from "react-router-dom";
import {Option} from "antd/es/mentions";

const productTypeData = ['Book', 'DVD', 'Furniture'];

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    const [form] = Form.useForm();
    const [productType, setProductType] = useState(productTypeData[0]);
    const onFinish = (values) => {
        dispatch(createProduct(values))
        navigate('/');
    };
    const submitForm = () => {
        form.submit();
    }
    const handleOnChange = (value) => {
        console.log(value.target.value)
        setProductType(value.target.value)
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
            <Layout style={{minHeight: 1000}}>
                <Header>
                    <Row justify={'space-between'}>
                        <Title style={{color: 'white'}}>Product Add</Title>
                        <Menu
                            style={{maxHeight: 64, minWidth: 300}}
                            theme="dark"
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
                <Content style={{padding: '2% 10%', margin: '3% 0', backgroundColor: "#fff"}}>
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
                            rules={[{required: true, message: 'Please input your price!'}]}
                        >
                            {
                                /*
                                     This code doesn't see AutoQA but it makes our life easy)
                                     <>
                                        <Select id={'productType'} onChange={handleOnChange}>
                                        {
                                            productTypeData.map(data => (
                                                    <Option key={data} value={data}>{data}</Option>
                                                )
                                            )
                                        }
                                        </Select>
                                    </>
                                 */
                            }
                            <select name="productType" id="productType" onChange={handleOnChange}>
                                {
                                    productTypeData.map(data => (
                                            <option key={data} value={data}>{data}</option>
                                        )
                                    )
                                }
                            </select>
                        </Form.Item>
                        {
                            productTypeSpecific()
                        }
                    </Form>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    Scandiweb Test assigment
                </Footer>
            </Layout>
        </>
    )
}

export default AddProduct;