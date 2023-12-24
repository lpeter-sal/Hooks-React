import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer";


describe('Prueba en <TodoItem />', () => { 


    const todo = {
        id: 1,
        description: 'Piedra del Alma',
        done: false
    };

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el Todo Pendiente de completar', () => { 

        render( <TodoItem 
                    todo={ todo } 
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                /> 
        );

        const liElement = screen.getByRole('listitem');
        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');
        
        const spanElement = screen.getByLabelText('span');
        expect(spanElement.className).toContain('align-self-center');
        expect(spanElement.className).not.toContain('text-decoration-line-through');
    });


    test('Debe de mostrar el Todo completado', () => {
        
        todo.done = true;

        render( <TodoItem 
                    todo={ todo } 
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                /> 
        );

        const spanElement = screen.getByLabelText('span');
        expect(spanElement.className).toContain('text-decoration-line-through');
    });

    test('Span debe de llamar al onToggleTodo cuando se hace click', () => {
        
        todo.done = true;

        render( <TodoItem 
                    todo={ todo } 
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                /> 
        );

        const spanElement = screen.getByLabelText('span');
        //SIMULAR EL CLICK CON fireEvent
        fireEvent.click( spanElement );

        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id );
    });
    
    test('Boton debe de llamar al onDeleteTodo cuando se hace click', () => {

        render( <TodoItem 
                    todo={ todo } 
                    onToggleTodo={ onToggleTodoMock } 
                    onDeleteTodo={ onDeleteTodoMock }
                /> 
        );

        const buttonElement = screen.getByRole('button')
        //SIMULAR EL CLICK CON fireEvent
        fireEvent.click( buttonElement );

        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );
    });

})

