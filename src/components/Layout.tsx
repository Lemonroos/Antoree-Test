import { CloseOutlined, FacebookFilled, InstagramFilled, MenuOutlined, XOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Grid, Layout, Menu, Row, Typography } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

const menuItems = [
    { key: '/', label: 'Home', to: '/' },
    { key: '/products', label: 'Products', to: '/products' },
    { key: '/favorites', label: 'Favorites', to: '/favorites' },
];

export default function AppLayout() {
    const screens = Grid.useBreakpoint();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const NavLinks = () => (
        <Menu
            mode={screens.md ? 'horizontal' : 'inline'}
            selectable={false}
            items={menuItems.map(item => ({
                key: item.key,
                label: (
                    <NavLink
                        to={item.to}
                        onClick={() => !screens.md && setDrawerVisible(false)}
                        className="px-3 py-2 hover:text-green-200"
                    >
                        {item.label}
                    </NavLink>
                )
            }))}
        />
    );

    return (
        <Layout className="min-h-screen flex flex-col">
            <Header className="fixed top-1 left-0 right-0 bottom-0 z-20  p-4 sm:px-8 flex items-center justify-between  shadow ">
                <NavLink to="/" className=" ">
                    <Title level={3} style={{ color: '#16a34a', padding: '0' }}>
                        ENGLISH
                    </Title>
                </NavLink>

                {screens.md ? (
                    <NavLinks />
                ) : (
                    <Button
                        type="text"
                        onClick={() => setDrawerVisible(true)}
                        className=""
                    >
                        <MenuOutlined style={{ fontSize: 24 }} />
                    </Button>
                )}

                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    closeIcon={<CloseOutlined
                    />}
                >
                    <NavLinks />
                </Drawer>
            </Header>

            <Content className="flex-grow pt-20 bg-white ">

                <div className="bg-white shadow ">
                    <Outlet />

                </div>
            </Content>

            <Footer className=" text-white border-t border-gray-200" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ">
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={12} md={8}>
                            <Title style={{ color: '#f5f5f5' }} level={4} className="text-white">About Us</Title>
                            <Text style={{ color: '#f5f5f5' }} className=" leading-relaxed">
                                English Learning Co. – Nền tảng giáo dục trực tuyến tích hợp AI.
                            </Text>
                        </Col>

                        <Col xs={24} sm={12} md={8}>
                            <Title style={{ color: '#f5f5f5' }} level={4} className="text-white">Quick Links</Title>
                            <ul className="space-y-2">
                                {menuItems.map(item => (
                                    <li key={item.key}>
                                        <NavLink to={item.to}>
                                            <Text style={{ color: '#f5f5f5' }}>
                                                {item.label}
                                            </Text>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col xs={24} sm={24} md={8}>
                            <Title style={{ color: '#f5f5f5' }} level={4} className="text-white">Contact</Title>
                            <Text style={{ color: '#f5f5f5' }} className="block text-gray-200">Email: support@englishco.com</Text>
                            <Text style={{ color: '#f5f5f5' }} className="block text-gray-200">Phone: +84 123 456 789</Text>
                            <div className="mt-4 space-x-4 " >
                                <Link href="#" target="_blank" ><FacebookFilled style={{ color: '#f5f5f5' }} /></Link>
                                <Link href="#" target="_blank" ><XOutlined style={{ color: '#f5f5f5' }} /></Link>
                                <Link href="#" target="_blank" ><InstagramFilled style={{ color: '#f5f5f5' }} /></Link>
                            </div>
                        </Col>
                    </Row>

                    <div className="mt-8 text-center text-gray-50">
                        © {new Date().getFullYear()} English Learning Co. All rights reserved.
                    </div>
                </div>
            </Footer>
            {/* <Footer className="bg-green-700 text-white text-center py-4 w-full flex justify-center bottom-0" >
//                 © {new Date().getFullYear()} English Learning Co. All rights reserved.
//             </Footer> */}
        </Layout >
    );
}
