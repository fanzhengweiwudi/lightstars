import {ModalFormBase} from "../form/modal.js";

export class InterfaceCreate extends ModalFormBase {
    //
    constructor (props) {
        super(props);

        this.render();
        this.loading();
    }

    loading() {
        this.container().find('#finish-btn').on('click', this, function(e) {
            e.data.submit();
            e.data.container().modal("hide");
        });
        this.container().find('#cancel-btn').on('click', this, function(e) {
            e.data.container().modal("hide");
        });
    }

    template() {
        return `
    <div class="modal-dialog modal-lg modal-dialog-centered sw-modal overflow-auto" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="">Create Interface</h5>
            </div>
            <div id="" class="modal-body">
                <form name="interface-new">
                <div class="form-group row">
                    <label for="type" class="col-sm-4 col-form-label-sm">Network type</label>
                    <div class="col-sm-6">
                        <div class="input-group">
                            <select class="select-simple select-middle" name="type">
                                <option value="bridge" selected>Linux Bridge</option>
                                <option value="ovs">Open vSwitch</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="model" class="col-sm-4 col-form-label-sm">Target model</label>
                    <div class="col-sm-6">
                        <div class="input-group">
                            <select class="select-simple select-middle" name="model">
                                <option value="virtio" selected>Linux Virtual IO</option>
                                <option value="rtl8139">Realtek rtl8139</option>
                                <option value="e1000">Intel e1000</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="source" class="col-sm-4 col-form-label-sm">Bridge source</label>
                    <div class="col-sm-6">
                        <div class="input-group">
                            <select class="select-simple select-middle" name="interface">
                                <option value="virbr0" selected>Virtual Bridge0</option>
                                <option value="virbr1">Virtual Bridge1</option>
                                <option value="virbr2">Virtual Bridge2</option>
                                <option value="br-br1">OpenvSwitch Bridge1</option>
                                <option value="br-br2">OpenvSwitch Bridge2</option>
                                <option value="br-mgt">OpenvSwitch Manager Bridge</option>
                            </select>  
                        </div>
                    </div>
                </div>
                </form>
            </div>
            <div id="" class="modal-footer">
                <div class="btn-group mr-2 sw-btn-group-extra" rol="group">
                    <button id="finish-btn" class="btn btn-outline-success btn-sm">Finish</button>
                    <button id="reset-btn" class="btn btn-outline-dark btn-sm">Reset</button>
                    <button id="cancel-btn" class="btn btn-outline-dark btn-sm">Cancel</button>
                </div>
            </div>
        </div>
    </div>`
    }
}