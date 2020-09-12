import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "dialog-overview-example-dialog",
    template: ``,
})
export class ClientFormDialog {
    constructor(
        public dialogRef: MatDialogRef<ClientFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
