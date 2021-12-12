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
