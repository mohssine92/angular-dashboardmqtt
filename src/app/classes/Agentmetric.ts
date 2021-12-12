export interface Agentmetric {
    agent?:   Agent;
    metrics?: Metric[];
}

export interface Agent {
    id?:        number;
    uuid?:      string;
    username?:  string;
    name?:      string;
    hostname?:  string;
    pid?:       number;
    admin?:     boolean;
    connected?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Metric {
    id?:        number;
    type?:      string;
    value?:     string;
    createdAt?: Date;
    timestamp?: Date;
}
