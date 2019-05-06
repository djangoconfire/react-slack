import React, { Component } from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { gql , graphql } from 'react-apollo';

class Register extends Component {
    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    }

    onSubmit = async () => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: ''
        })
        const { username, email, password } = this.state;
        const response = await this.props.mutate({
            variables: { username, email, password }
        })

        console.log("Response", response)
;
        const { ok, errors } = response.data.register
        if(ok) {
            this.props.history.push('/')
        } else { 
            const err = {};
            errors.forEach(({ path , message }) => {
                err[`${path}Error`] = message
            })  

            this.setState(err)
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const {username, usernameError, email, emailError, password, passwordError } = this.state;
        const errorList = []

        if(usernameError){
            errorList.push(usernameError)
        }
        if(emailError){
            errorList.push(emailError)
        }
        if(passwordError){
            errorList.push(passwordError)
        }

        return (
            <Container text>
                <Header as='h2'>Register</Header>
                {/* Username */}
                <Input 
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={this.onChange} fluid 
                />
                {/* Email */}
                <Input 
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.onChange} fluid 
                />
                {/* Password */}
                <Input 
                    name="password"
                    value={password}
                    placeholder="password"
                    type="password"
                    onChange={this.onChange} fluid 
                />
                {/* Submit Button */}
                <Button onClick={this.onSubmit}>Register</Button>
                { usernameError || emailError || passwordError ?
                    (<Message error Header="There are some error with frm submissions" list={errorList} />)
                    : null 
                }
            </Container>
        )
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!){
        register(username: $username, email: $email, password: $password){
            ok
            errors{
                path
                message
            }
        }
    }
`;

export default graphql(registerMutation)(Register);