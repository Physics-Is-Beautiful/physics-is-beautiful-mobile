import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ClassroomPage } from "./classroom";

@NgModule({
  declarations: [
    ClassroomPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassroomPage),
  ],
})
export class ClassroomPageModule {}
