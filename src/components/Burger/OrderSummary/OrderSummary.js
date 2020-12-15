import React from 'react';

import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>
                    : {props.ingredients[igKey]}</li>
        });
    
    return <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to checkout?</p>
        <Button buttonType={"Danger"} clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button buttonType={"Success"} clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
};

export default orderSummary;