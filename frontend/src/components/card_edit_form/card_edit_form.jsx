import React from 'react';
import styles from './card_edit_form.module.css';

const CardEditForm = ({card}) => (
    <section className={styles.editForm}>
        <h1>{card.name}</h1>
        <h5>{card.message}</h5>

    </section>
);

export default CardEditForm;