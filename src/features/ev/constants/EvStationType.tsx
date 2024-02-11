export interface EvStationType {
    name: string;
    googleMap: string;
    stationName: string;
    stationId: number;
};

export interface StationSocketType {
    socketId: number;
    socketStatusId: string;
    power: number;

}

export interface EvStationCardType {
    name: string;
    googleMap: string;
    stationName: string;
    stationId: number;
    caption: string;
    addressAddress: string;
    stationStatus: 'AVAILABLE' | 'CHARGING' | 'FAULTED';
    sockets: Array<StationSocketType>;
};