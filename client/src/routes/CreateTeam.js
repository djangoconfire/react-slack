import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Form, Button, Input, Container, Header, Message } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class CreateTeamComponent extends React.Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            name: '',
            errors: {},
        });
    }

    onSubmit = async () => {
        const { name } = this;
        const response = await this.props.mutate({
            variables: { name }
        })
        // Response from backend
        console.log("Response",response);
        const { ok, errors } = response.data.createTeam;
        if (ok){
            this.props.history.push('/')
        }else {
            const err = {};
            errors.forEach(({ path , message }) => {
                err[`${path}Error`] = message;
            })

            this.errors = err;
            console.log("erros",this.errors)
        }
    };

    onChange = e => {
        const { name, value } = e.target;
        this[name] = value;
    };

    render() {
        const { name , errors : { nameError } } = this;
        const errorList = [];

        if (nameError){
            errorList.push(nameError)
        }

        console.log("Error list", errorList);
    
        return (
        <Container text>
            <Header as="h2">Create Team</Header>
            <Form>
                <Form.Field error={!!nameError}>
                    <Input 
                        name="name" 
                        onChange={this.onChange} 
                        value={name} 
                        placeholder="Enter a team name" fluid 
                    />
                </Form.Field>
                <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
            {
                errorList.length ? (
                    <Message error header="There are some errors with your submissions" list={errorList}/>
                ) : null
            }
        </Container>
        );
    }
}

const createTeamMutation = gql`
    mutation($name: String!){
        createTeam(name: $name){
            ok
            errors{
                path
                message
            }
        }
    }
`

export default graphql(createTeamMutation)(observer(CreateTeamComponent))