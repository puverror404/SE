*** Settings ***
Library          SeleniumLibrary
Test Setup       Open Browser    ${URL}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${URL}        https://practicetestautomation.com/practice-test-login/
${BROWSER}    chrome

*** Test Cases ***
Valid Login
    Input Text        id:username    student
    Input Password    id:password    Password123
    Click Button      id:submit
    Location Should Contain    logged-in-successfully
    Page Should Contain        Congratulations

Wrong Username
    Input Text        id:username    incorrectUser
    Input Password    id:password    Password123
    Click Button      id:submit
    Element Text Should Be    id:error    Your username is invalid!

Wrong Password
    Input Text        id:username    student
    Input Password    id:password    incorrectPassword
    Click Button      id:submit
    Element Text Should Be    id:error    Your password is invalid!
