import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.3,
    meat: 1.5,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 2,
        canBuy: false,
        clickedOrderButton: false,
    }

    updateBuyState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({canBuy: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateBuyState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateBuyState(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({clickedOrderButton: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({clickedOrderButton: false});
    }

    continuePurchaseHandler = () => {
        alert('contineu!!!')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
          <Aux>
              <Modal show={this.state.clickedOrderButton} closeModal={this.cancelPurchaseHandler}>
                  <OrderSummary 
                    totalPrice={this.state.totalPrice}
                    purchaseCancelled={this.cancelPurchaseHandler}
                    purchaseContinued={this.continuePurchaseHandler}
                    ingredients={this.state.ingredients}/>
              </Modal>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls 
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                canBuy={this.state.canBuy}
                ordered={this.orderHandler}
              />
          </Aux>  
        );
    }
}

export default BurgerBuilder;