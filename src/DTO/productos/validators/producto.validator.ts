import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Validador: Stock Actual <= Stock Máximo
@ValidatorConstraint({ name: 'IsStockActualValid', async: false })
export class IsStockActualValidConstraint implements ValidatorConstraintInterface {
    validate(stockActual: number, args: ValidationArguments) {
        const object = args.object as any;
        const stockMaximo = object.stockMaximo;

        if (stockMaximo === undefined || stockActual === undefined) {
            return true; // Dejar que @IsNotEmpty maneje los undefined
        }

        return stockActual <= stockMaximo;
    }

    defaultMessage(args: ValidationArguments) {
        const object = args.object as any;
        return `El stock actual (${args.value}) no puede exceder el stock máximo (${object.stockMaximo})`;
    }
}

export function IsStockActualValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStockActualValidConstraint,
        });
    };
}

// Validador: Stock Mínimo <= Stock Máximo
@ValidatorConstraint({ name: 'IsStockMinimoValid', async: false })
export class IsStockMinimoValidConstraint implements ValidatorConstraintInterface {
    validate(stockMinimo: number, args: ValidationArguments) {
        const object = args.object as any;
        const stockMaximo = object.stockMaximo;

        if (stockMaximo === undefined || stockMinimo === undefined) {
            return true;
        }

        return stockMinimo <= stockMaximo;
    }

    defaultMessage(args: ValidationArguments) {
        const object = args.object as any;
        return `El stock mínimo (${args.value}) no puede exceder el stock máximo (${object.stockMaximo})`;
    }
}

export function IsStockMinimoValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStockMinimoValidConstraint,
        });
    };
}

// Validador: Precio Venta >= Precio Costo
@ValidatorConstraint({ name: 'IsPrecioVentaValid', async: false })
export class IsPrecioVentaValidConstraint implements ValidatorConstraintInterface {
    validate(precioVenta: number, args: ValidationArguments) {
        const object = args.object as any;
        const precioCosto = object.precioCosto;

        if (precioCosto === undefined || precioVenta === undefined) {
            return true;
        }

        return precioVenta >= precioCosto;
    }

    defaultMessage(args: ValidationArguments) {
        const object = args.object as any;
        return `El precio de venta (${args.value}) debe ser mayor o igual al precio de costo (${object.precioCosto})`;
    }
}

export function IsPrecioVentaValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPrecioVentaValidConstraint,
        });
    };
}
