export interface ServerHost {
    arch: string;
    bootTime: number;
    countryCode: string;
    cpu: string[];
    diskTotal: number;
    gpu: string[];
    memTotal: number;
    platform: string;
    platformVersion: string;
    swapTotal: number;
    version: string;
    virtualization: string;
    ip: string;
}

export interface ServerTemperature {
    name: string;
    temperature: number;
}

export interface ServerState {
    cpu: number;
    diskUsed: number;
    gpu: number[];
    load1: number;
    load15: number;
    load5: number;
    memUsed: number;
    netInSpeed: number;
    netInTransfer: number;
    netOutSpeed: number;
    netOutTransfer: number;
    processCount: number;
    swapUsed: number;
    tcpConnCount: number;
    temperatures: ServerTemperature[];
    udpConnCount: number;
    uptime: number;
    updated_at: string;
    uuid: string;
}

export interface Server {
    id: number;
    name: string;
    ddns_profiles: number[];
    created_at: string;
    display_index: number;
    enable_ddns: boolean;
    hide_for_guest: boolean;
    host: ServerHost;
    last_active: string;
    note: string;
    public_note: string;
    state: ServerState;
}