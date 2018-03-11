import * as React from 'react';
import {hot} from 'react-hot-loader'
import {Header} from './header';
import {Title} from './title';
import {Techs} from './techs/techs';
import {Footer} from './footer';

const styles: React.CSSProperties = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

interface IMainProps {}

interface IMainState {}
/*{m.keys().map(it => (<li>m.get(it)</li>))}*/
class Application extends React.Component<IMainProps, IMainState> {
  render() {
    /*let m = new Map()
    m.set(1, 'My val 1')
    m.set(2, 'My val 2')*/
    return (
      <div style={styles.container}>
        <Header/>
        <ul>&nbsp;</ul>
        <main style={styles.main}>
          <Title/>
          <Techs/>
        </main>
        <Footer/>
      </div>
    );
  }
}

const Main = hot(module)(Application)

export {Main}
