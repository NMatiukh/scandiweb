import {Card, Checkbox, Col, Row, Spin, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addProductForDelete, loadingProducts, removeProductForDelete} from "../redux/actions";
import {useEffect} from "react";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    const loadingProductsLoader = useSelector(state => state.load.loadingProductsLoader);
    const productsForDelete = useSelector(state => state.products.productsForDelete);

    function onChange(e, product) {
        if (e.target.checked) {
            dispatch(addProductForDelete(product));
        } else {
            dispatch(removeProductForDelete(product));
        }
    }

    useEffect(() => {
        dispatch(loadingProducts())
    }, [dispatch])
    return (
        loadingProductsLoader ?
            <Spin style={{margin: "auto"}}/> :
            products.map(product => {
                    return (
                        <Col key={product.sku} span={6}>
                            <Card bordered={true} style={{borderColor: "black"}}>
                                <Checkbox  checked={productsForDelete.includes(product)} className={'delete-checkbox'} onChange={(event) => onChange(event, product)}/>
                                <Row>
                                    <Col offset={8}>
                                        <Typography.Paragraph>
                                            <Typography>
                                                {product.sku.toUpperCase()}
                                            </Typography>
                                            <Typography>
                                                {product.name}
                                            </Typography>
                                            <Typography>
                                                {product.price + ' $'}
                                            </Typography>
                                            <Typography>
                                                {
                                                    product.productType === 'DVD' && ("Size: " + product.size + ' MB')
                                                }
                                                {
                                                    product.productType === 'Book' && ("Weight: " + product.weight + ' KG')
                                                }
                                                {
                                                    product.productType === 'Furniture' && ("Dimension: " + product.height + 'x' + product.width + 'x' + product.length)
                                                }
                                            </Typography>
                                        </Typography.Paragraph>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )
                }
            )
    )
}

export default Products;