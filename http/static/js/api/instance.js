import {Api} from "./api.js";
import {Alert} from "../com/alert.js";


export class InstanceApi extends Api {
    // {
    //   uuids: [],
    //   tasks: 'tasks',
    //   name: ''
    // }
    constructor(props) {
        super(props)
    }

    url(uuid) {
        if (uuid) {
            return `/api/instance/${uuid}`
        }
        return '/api/instance'
    }

    list(data, func) {
        $.get(this.url(), {format: 'schema'}, (resp, status) => {
            func({data, resp});
        }).fail((e) => {
            $(this.tasks).append(Alert.danger(`GET ${url}: ${e.responseText}`));
        });
    }

    start() {
        this.uuids.forEach((uuid) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'start'});

            $.put(url, data, (resp, status) => {
                $(this.tasks).append(Alert.success(`start '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger(`PUT ${url}: ${e.responseText}`));
            });
        });
    }

    shutdown() {
        this.uuids.forEach((uuid) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'shutdown'});

            $.put(url, data, (resp, status) => {
                $(this.tasks).append(Alert.success(`shutdown '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.warn(`PUT ${url}: ${e.responseText}`));
            });
        });
    }

    reset() {
        this.uuids.forEach((uuid, index, err) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'reset'});

            $.put(url, data, (resp, status) => {
                $(this.tasks).append(Alert.success(`reset '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger(`PUT ${url}: ${e.responseText}`));
            });
        });
    }

    suspend() {
        this.uuids.forEach((uuid, index, err) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'suspend'});

            $.put(this.url(uuid), data, (resp, status) => {
                $(this.tasks).append(Alert.success(`suspend '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger(`PUT ${url}: ${e.responseText}`));
            });
        });
    }

    resume() {
        this.uuids.forEach((uuid, index, err) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'resume'});

            $.put(url, data, (resp, status) => {
                $(this.tasks).append(Alert.success(`resume '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger(`PUT ${url}: ${e.responseText}`));
            });
        });
    }

    destroy() {
        this.uuids.forEach((uuid, index, err) => {
            let url = this.url(uuid);
            let data = JSON.stringify({action: 'destroy'});

            $.put(url, data, (resp, status) => {
                $(this.tasks).append(Alert.success(`destroy '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger((`PUT ${url}: ${e.responseText}`)));
            });
        });
    }

    remove() {
        this.uuids.forEach((uuid, index, err) => {
            let url = this.url(uuid);

            $.delete(url, (resp, status) => {
                $(this.tasks).append(Alert.success(`remove '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.danger((`DELETE ${url}: ${e.responseText}`)));
            });
        });
    }

    edit(data) {
        let uuid = this.uuids[0];
        let url = this.url(uuid);

        if (data.cpu !== "") {
            let cpu = {cpu: data.cpu};

            $.put(url+"/processor", JSON.stringify(cpu), (resp, status) => {
                $(this.tasks).append(Alert.success(`set processor for '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.warn((`PUT ${url}: ${e.responseText}`)));
            });
        }
        if (data.memSize !== "") {
            let mem = {size: data.memSize, unit: data.memUnit};

            $.put(url+"/memory", JSON.stringify(mem), (resp, status) => {
                $(this.tasks).append(Alert.success(`set memory for '${uuid}' success`));
            }).fail((e) => {
                $(this.tasks).append(Alert.warn((`PUT ${url}: ${e.responseText}`)));
            });
        }
    }

    console() {
        this.uuids.forEach((uuid, index, err) => {
            let passwd = '';
            if (this.props.passwd) {
                passwd = this.props.passwd[uuid];
            }
            window.open("/ui/console?id=" + uuid + "&password=" + passwd);
        });
    }

    create (data) {
        $.post(this.url(), JSON.stringify(data), (resp, status) => {
            $(this.tasks).append(Alert.success(`create '${resp.name}' success`));
        }).fail((e) => {
            $(this.tasks).append(Alert.danger(`POST ${this.url()}: ${e.responseText}`));
        });
    }
}