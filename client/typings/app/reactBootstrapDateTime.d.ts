declare module "react-bootstrap-datetimepicker" {
    // Import React
    import React = require("react");

    // <DateTimePicker />
    // ----------------------------------------
    interface DateTimeFieldProps extends React.HTMLAttributes {

        // Optional
        /**
         * moment().format('x')
         * Represents the inital dateTime, this string is then parsed by moment.js
        */
        dateTime?: string;
        /**
         * moment().format('x')
         * Defines the format moment.js should use to parse and output the date to onChange
         */
        format?: string;
        /**
         * "MM/DD/YY h:mm A"
         * Defines the way the date is represented in the HTML input. It must be a format understanable by moment.js
         */
        onChange?: React.EventHandler<React.FormEvent>;
        showToday?: boolean;
        //TODO
        //size?: string;
        daysOfWeekDisabled?: Number[];
        viewMode?: string;
        inputProps?: Object,
        minDate?: any,
        maxDate?: any,
        mode?: string,
        defaultText?: string
    }
    type DateTimeField = React.ClassicComponent<DateTimeFieldProps, {}>;
    var DateTimeField: React.ClassicComponentClass<DateTimeFieldProps>;

    export = DateTimeField;
}