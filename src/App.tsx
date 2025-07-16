import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';
import { rootRouter } from './routers/root';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#16a34a',
          borderRadius: 6,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.3,
          lineHeightHeading3: 1.3,

        },

        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 6,
          },
          Input: {
            controlHeight: 40,
            borderRadius: 6,
          },
          Typography: {
            // colorText: "#ffffff",
            // color: "#ffffff",
            // colorTextBase: "",

          },
          Select: {
            controlHeight: 40,
            borderRadius: 6,
          },

          // Layout
          Layout: {
            colorBgHeader: '#ffffff',
            colorBgBody: '#f8fafc',
            colorBgContainer: "#ffffff",
            colorBgLayout: "#f5f5f5",
            // colorBgFooter: '#ffffff',
            // colorText: '#fff',
            footerBg: "#16a34a",
          },
          Menu: {
            itemBg: '#ffffff',
            itemActiveBg: '#e6f7ff',
            itemBorderRadius: 6,
            colorText: '#1e293b',
            colorIcon: "#1e293b",
            colorIconHover: "#16a34a",
            // colorTextHover: '#16a34a',
            // colorTextActive: '#ffffff',
            // itemActiveBg: '#16a34a',
          },
          Drawer: {
            // Chiều cao header, padding
            // headerHeight: 56,
            // colorBgHeader: '#16a34a',
            // colorTitle: '#ffffff',
            // colorBgBody: '#ffffff',
            paddingContentVertical: 24,
            paddingContentHorizontal: 24,
            colorBgBase: '#000',
          },

          // Carousel
          Carousel: {
            arrowSize: 32,
            // dotSize: 8,
            // dotActiveSize: 8,
            // dotColor: '#cbd5e1',
            dotActiveWidth: 8,
            // dotActiveColor: '#16a34a',
          },

          // Card
          Card: {
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          },

          // Pagination
          Pagination: {
            itemSize: 32,
            colorText: '#1e293b',
            colorPrimary: '#16a34a',
          },
        },
      }}
    >
      <RouterProvider router={rootRouter} />
    </ConfigProvider>
  );
}

export default App;
