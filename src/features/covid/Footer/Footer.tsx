import React from 'react';
import styles from './Footer.module.css';


const Footer:React.FC = () => {
  return (
    <footer className={styles.footerStyles}>
       Yusuke Yoshihiro @ 2021 All Right Reserved <br/>Referring <a href="https://covid19.mathdro.id/api"> &nbsp; API - Covid-19 Mathdro.id </a>
    </footer>
  )
}

export default Footer



