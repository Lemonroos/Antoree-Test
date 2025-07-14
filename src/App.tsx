import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';
import './App.css';
import { rootRouter } from './routers/root';
function App() {

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button className="mt-4 shadow-lg " draggable>Custom styled button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       */}
      <ConfigProvider theme={{
        components: {
          Layout: {
            colorPrimary: '',
            headerBg: '',
            footerBg: '',
            colorText: '',
          },
          Menu: {
            colorText: '',
            itemBg: '',
            colorBgBase: '',
          },
          Drawer: {
            colorText: '',
            // footerPaddingInline:1
            // size,
            // itemBg: '',
            colorBgBase: '',
          },
          Carousel: {
            arrowSize: 40,
            colorBgContainer: '#001529',
            colorText: '#803050',
            // arrowOffset: 400,
            
          },

        },
      }}>

        <RouterProvider router={rootRouter} />
      </ConfigProvider>
    </>
  )
}

export default App
