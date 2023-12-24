import { renderHook } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm"
import { act } from "react-dom/test-utils";


describe('Pruebas en el useForm', () => { 

    const initialForm = {
        name: 'Pedro',
        email: 'pedro@yahoo.mx'
    }

    test('Debe regresar los valores por defecto', () => { 

        const { result } = renderHook( () => useForm(initialForm) );
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function )
          });
    });

    test('Debe de cambiar el nombre del formulario', () => { 

        const newValue = 'Luis';
        const { result } = renderHook( () => useForm(initialForm) );
        const { onInputChange } = result.current;
        act( () => {
            onInputChange({ target: { name: 'name', value: newValue} });
        });

        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);

    });

    test('Debe de realizar el reset del formulario', () => { 

        const newValue = 'Luis';
        const { result } = renderHook( () => useForm(initialForm) );
        const { onInputChange, onResetForm } = result.current;
        act( () => {
            onInputChange({ target: { name: 'name', value: newValue} });
            onResetForm();
        });

        expect(result.current.name).toBe( initialForm.name );
        expect(result.current.formState.name).toBe(initialForm.name);

    });


})