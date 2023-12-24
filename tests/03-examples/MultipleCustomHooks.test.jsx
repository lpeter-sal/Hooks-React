import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples/MultipleCustomHooks"
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => { 

    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach( () => {
        jest.clearAllMocks();
    })


    test('Debe de mostrar el componente por defecto', () => { 

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        });

        render( <MultipleCustomHooks /> );

        expect( screen.getByText('Loading...') );
        expect( screen.getByText('Breaking Bad Quotes') );

        const nextButton = screen.getByRole('button', {name: 'Next episode'});
        expect( nextButton.disabled ).toBeTruthy();
        // screen.debug(); 
    });

    test('Debe de mostrar Episode', () => { 
        
        useFetch.mockReturnValue({
            data: {name: 'Pedro', episode: 'ESPE001'},
            isLoading: false,
            hasError: null
        });

        render( <MultipleCustomHooks /> );

        expect( screen.getByText('Pedro') ).toBeTruthy();
        expect( screen.getByText('ESPE001') ).toBeTruthy();

        const nextButton = screen.getByRole('button', {name: 'Next episode'});
        expect( nextButton.disabled ).toBeFalsy();
        // screen.debug();
    });

    test('Debe de llamar la funcion de incrementar', () => { 

        useFetch.mockReturnValue({
            data: {name: 'Pedro', episode: 'ESPE001'},
            isLoading: false,
            hasError: null
        });

        render( <MultipleCustomHooks /> );

        const nextButton = screen.getByRole('button', {name: 'Next episode'});
        fireEvent.click( nextButton );

        expect( mockIncrement ).toHaveBeenCalled();
    });

});