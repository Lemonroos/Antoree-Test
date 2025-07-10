
// // import { MenuOutlined } from '@ant-design/icons';
// import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
// import { Button, Drawer, Grid, Layout, Menu, Typography } from 'antd';
// // import Sider from 'antd/es/layout/Sider';
// import { type SetStateAction, useState } from 'react';
// import { Link, NavLink, Outlet } from 'react-router';

import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Grid, Layout, Menu, Typography } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;
const { Link,Title } = Typography;   

// const { Title } = Typography;

// export default function RootLayout() {
//   const items = [
//     { label: 'Homepage', key: 'homepage', path: '/' },
//     { label: 'Favorites', key: 'news', path: '/favorites' },
//     // { label: 'About Us', key: 'about-us', path: '/about-us' },
//   ];
//   const [current, setCurrent] = useState('homepage');

//   const handleClick = (e: { key: SetStateAction<string>; }) => {
//     setCurrent(e.key);
//   };

//   return (
//     <Layout>
//       <Header style={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 50px', background: '#001529' }}>
//         <Title level={2} style={{ color: 'white', lineHeight: '0px' }}>STEM Homepage</Title>
//         <Menu theme="dark" mode="horizontal" selectedKeys={[current]} onClick={handleClick}>
//           {items.map(item => (
//             <Menu.Item key={item.key}>
//               <Link to={item.path}>{item.label}</Link>
//             </Menu.Item>
//           ))}
//         </Menu>
//         <Link to="/login">
//           <Button type="primary" size="large" style={{ marginTop: '15px' }}>
//             Login
//           </Button>
//         </Link>
//       </Header>
//       <Content style={{ padding: '0 50px', marginTop: 64 }}>
//         <Outlet />
//       </Content>
//       <Footer style={{ textAlign: 'center', position: 'fixed', display: 'flex', justifyContent: 'center', width: '100%', bottom: 0 }}>
//         STEM Program ©{new Date().getFullYear()} All Rights Reserved
//       </Footer>
//     </Layout>
//   );
// };



/**
 * AppLayout: responsive layout with green/white academic theme
 */
// export default function AppLayout() {
//   const screens = Grid.useBreakpoint();
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const menuItems = [
//     { key: '1', label: 'Trang chủ', to: '/' },
//     { key: '2', label: 'Yêu thích', to: '/favorites' },
//     // Thêm mục khác nếu cần
//   ];

//   return (
//     <Layout className="min-h-screen bg-white">
//       {/* Sidebar on desktop */}
//       {screens.lg ? (
//         <Sider
//           width={256}
//           className="bg-green-600 text-white shadow-lg"
//           collapsedWidth={0}
//           breakpoint="lg"
//         >
//           <div className="h-16 flex items-center justify-center text-2xl font-bold">
//             Học Hỏi
//           </div>
//           <Menu
//             theme="dark"
//             mode="inline"
//             items={menuItems.map(item => ({
//               key: item.key,
//               label: <a href={item.to}>{item.label}</a>
//             }))}
//           />
//         </Sider>
//       ) : (
//         <>
//           {/* Mobile header with visible menu button */}
//           <Header className="bg-green-600 px-4 shadow-md flex justify-between items-center">
//             <Button
//               type="primary"
//               shape="circle"
//               icon={<MenuOutlined />}
//               onClick={() => setDrawerVisible(true)}
//             />
//             <div className="text-xl font-bold text-white">Học Hỏi</div>
//           </Header>
//           {/* Drawer for mobile menu */}
//           <Drawer
//             title="Menu"
//             placement="left"
//             onClose={() => setDrawerVisible(false)}
//             open={drawerVisible}
//             bodyStyle={{ padding: 0 }}
//           >
//             <Menu
//               mode="inline"
//               items={menuItems.map(item => ({
//                 key: item.key,
//                 label: <a href={item.to}>{item.label}</a>
//               }))}
//             />
//           </Drawer>
//         </>
//       )}

//       <Layout>
//         {/* Optional fixed header on mobile can be omitted */}
//         {!screens.lg && null}

//         {/* Main content area */}
//         <Content className="bg-green-50 py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Wrap content for readability */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//               <Outlet />
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }


const menuItems = [
    { key: 'home', label: 'Home', to: '/' },
    { key: 'favorites', label: 'Favorites', to: '/favorites' },
    // add more if needed
];

export default function AppLayout() {
    const screens = Grid.useBreakpoint();
    const [drawerVisible, setDrawerVisible] = useState(false);

    // Render nav links inline or in drawer
    const NavLinks = () => (
        <Menu 
            mode={screens.md ? 'horizontal' : 'inline'}
            selectedKeys={[]}
            items={menuItems.map(item => ({
                key: item.key,
                label: screens.md ? (
                    <NavLink to={item.to} className="px-4 py-2 hover:text-green-200">
                        {item.label}
                    </NavLink>
                ) : (
                    <NavLink to={item.to} onClick={() => setDrawerVisible(false)}>
                        {item.label}
                    </NavLink>
                )
            }))}
            className={screens.md ? 'bg-transparent flex items-center text-white' : ''}
        />
    );

    return (
        <Layout className="min-h-screen bg-green-50 flex flex-col">
            {/* Header */}
            <Header className="bg-green-700 text-white px-4 py-3 flex items-center justify-between fixed w-full z-10">
                <div className="text-2xl font-bold text-white">
                    <Link href="/">
                        <Title level={2} >
                            LogoPlaceholder
                        </Title>
                    </Link>
                </div>

                {/* Desktop nav links */}
                {screens.md ? (
                    <NavLinks />
                ) : (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: 'white', fontSize: '1.5rem' }} />}
                        onClick={() => setDrawerVisible(true)}
                    />
                )}

                {/* Mobile Drawer */}
                <Drawer
                    title="Navigation"
                    placement="right"
                    // size='
                    // size='default'
                    width={200}
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    // bodyStyle={{ padding: 0 }}
                    // headerStyle={{ background: '#047857', color: '#fff' }}
                    closeIcon={<CloseOutlined style={{ color: 'black' }} />}
                >
                    <div className="bg-green-600 h-full p-4">
                        <NavLinks />
                    </div>
                </Drawer>
            </Header>

            {/* Main Content */}
            <Content className="flex-grow py-8 w-full bg-amber-500 mt-16">
                {/* img can be addded in the bg here, with tinted color of choice */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white  shadow-lg p-6 md:p-8">
                        <Outlet />
                    </div>
                </div>
            </Content>

            {/* Footer */}
            <Footer className="bg-green-700 text-white text-center fixed py-4 w-full flex justify-center bottom-0" >
                © {new Date().getFullYear()} English Learning Co. All rights reserved.
            </Footer>
        </Layout>
    );
}
