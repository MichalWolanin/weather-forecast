export interface WeatherResponse {
    id: number;
    weather: [    
        {
            description: string,
            icon: string
        }
    ];
    main: {
        temp: number,
    };
    name: string,
}