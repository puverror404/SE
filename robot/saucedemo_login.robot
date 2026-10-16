*** Settings ***
Resource         resource.robot
Test Setup       Open SauceDemo
Test Teardown    Close Browser

*** Test Cases ***
Login Success
    Login    ${USERNAME}    ${PASSWORD}
    Verify Login Success

Login Wrong Password
    Login    ${USERNAME}    wrong_password
    Page Should Contain    Username and password do not match

Login Wrong Username
    Login    wrong_user    ${PASSWORD}
    Page Should Contain    Username and password do not match

Login Empty Username
    Input Password    id:password    ${PASSWORD}
    Click Button      id:login-button
    Page Should Contain    Username is required

Login Empty Password
    Input Text        id:user-name    ${USERNAME}
    Click Button      id:login-button
    Page Should Contain    Password is required

Logout
    Login    ${USERNAME}    ${PASSWORD}
    Click Button     id:react-burger-menu-btn
    Wait Until Element Is Visible    id:logout_sidebar_link
    Click Link       id:logout_sidebar_link
    Location Should Be    ${URL}
    Element Should Be Visible    id:login-button
