*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         https://www.saucedemo.com/
${BROWSER}     chrome
${USERNAME}    standard_user
${PASSWORD}    secret_sauce

*** Keywords ***
Open SauceDemo
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Login
    [Arguments]    ${username}    ${password}
    Input Text        id:user-name    ${username}
    Input Password    id:password     ${password}
    Click Button      id:login-button

Verify Login Success
    Page Should Contain    Products
