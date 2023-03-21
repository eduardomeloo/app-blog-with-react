import './App.css';
import Post from './components/Post';
import Header from './components/Header';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route index element={
            <main>
                <Header />
                <Post />
            </main>
        } />
    </Routes>
  );
}

export default App;
