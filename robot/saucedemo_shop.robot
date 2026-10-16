*** Settings ***
Resource         resource.robot
Test Setup       Open SauceDemo
Test Teardown    Close Browser

*** Test Cases ***
Add Two Products To Cart
    Login    ${USERNAME}    ${PASSWORD}
    Click Button    id:add-to-cart-sauce-labs-backpack
    Click Button    id:add-to-cart-sauce-labs-bike-light
    Element Text Should Be    class:shopping_cart_badge    2

Remove Product From Cart
    Login    ${USERNAME}    ${PASSWORD}
    Click Button    id:add-to-cart-sauce-labs-backpack
    Click Button    id:add-to-cart-sauce-labs-bike-light
    Click Element   class:shopping_cart_link
    Page Should Contain    Your Cart
    Click Button    id:remove-sauce-labs-bike-light
    Page Should Not Contain    Sauce Labs Bike Light
    Element Text Should Be    class:shopping_cart_badge    1

Buy One Product Successfully
    Login    ${USERNAME}    ${PASSWORD}
    Click Button    id:add-to-cart-sauce-labs-backpack
    Element Should Contain    class:shopping_cart_badge    1
    Click Element   class:shopping_cart_link
    Page Should Contain    Sauce Labs Backpack
    Click Button    id:checkout
    Input Text      id:first-name     Testname
    Input Text      id:last-name      Testsurname
    Input Text      id:postal-code    90110
    Click Button    id:continue
    Page Should Contain    Checkout: Overview
    Page Should Contain    Sauce Labs Backpack
    Click Button    id:finish
    Page Should Contain    Thank you for your order!

Sort Price Low To High
    Login    ${USERNAME}    ${PASSWORD}
    Select From List By Value    css:[data-test="product-sort-container"]    lohi
    Element Text Should Be       css:.inventory_item_price    $7.99

Sort Name Z To A
    Login    ${USERNAME}    ${PASSWORD}
    Select From List By Value    css:[data-test="product-sort-container"]    za
    Element Text Should Be       css:.inventory_item_name    Test.allTheThings() T-Shirt (Red)
