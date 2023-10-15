<template>
  <v-container >
    <section id="firstSection">
      <v-parallax dark height="600">
        <v-row class="mt-10" align="left" justify="left">
          <v-col cols="6">
            <v-row align="center" justify="center">
              <v-col cols="12" md="8" xl="8">
                <!-- <h1 class="display-2 font-weight-bold mb-4">Vuetify.js</h1> -->
                <v-sheet
                :elevation="5"
                border
                rounded
                >
                  <div class="ma-4">
                    <h2 class="font-weight-bold">
                      <div class="text-left">CENTER OF EXCELLENCE <br>
                      IN INTELLIGENT CONTROL AUTOMATION OF PROCESS SYSTEMS
                      AS CENTER OF PROGRAMMABLE LOGIC CONTROLLER TRAINING
                      UNDER ERASMUS+ ASEAN FACTORI 4.0 PROJECT</div>
                    </h2>
                    <v-btn
                    rounded
                    outlined
                    large
                    dark
                    @click="scrollTo('More')"
                    class="mt-5"
                    >
                    MORE
                    <v-icon class="ml-2">mdi-arrow-down</v-icon>
                  </v-btn>
                </div>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="4" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
          </v-col>
          <v-col cols="6">
            <v-card theme="dark" flat rounded="4">
              <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows="hover"
              >
                <v-carousel-item
                  v-for="(image, index) in images"
                  :key="index"
                >
                  <v-img
                    :width="'100%'"
                    :height="'100%'"
                    aspect-ratio="1/1"
                    cover
                    :src="image"
                    alt="Image"
                  ></v-img>
                </v-carousel-item>
              </v-carousel>
        </v-card>
      </v-col>
      </v-row>
      </v-parallax>
    </section>
  <v-container id="More">
    <v-responsive class="align-center text-center">
      <v-row no-gutters>
        <v-col
        sm="12"
        >
          <v-sheet
          :elevation="10"
                border
                rounded
                >
            <div class="ma-4 text-body-1 text-left">
              The Erasmus+ Program for ASEAN FACTORI 4.0 Project
              enables a cooperation between Chulalongkorn University
              and University of Ruse “Angel Kanchev”, Bulgaria. The
              coordination of the training activities, technical support,
              and the knowledge enhancement towards Programmable
              Logic Controller (PLC) makes a significant impact on the
              students to be familiarized with an understanding of PLC.
              Objective: To develop basic knowledge of PLC and
              implementation through the modification of existing three
              courses:
              <br>
              <br><ol>
                1. Industrial Automation (Electrical Engineering
                Undergraduate Program),
              </ol>
              <ol>
                2. Process Dynamics and Control (Chemical
                Engineering Undergraduate Program)
              </ol>
              <ol>
                3. Instrumentation in Chemical Process (Chemical
                Engineering Graduate Program).
              </ol><br>
              Students shall be trained to gain sufficient practice on
              PLC languages and human-machine interface.

              <br><br>PLC hand-on laboratory contains workstations equipped
              with 4 computers and 4 notebooks, PLC unit and
              networking devices. A PLC training aims to familiarize
              vocational staff and students on how signals from input
              devices interface with PLC to invoke certain actions.
              PLC hand-on laboratory aims to enhance the students’
              learning of methods to measure and analyze control
              variables. The PLC training course emphasizes the role of
              programmable logic controllers, integrating the concepts of
              transfer functions, system response, stability, offset error,
              and controller design into common practice.
              <b> 609854-EPP-1-2019-1-FR-EPPKA2-CBHE-JP</b>
              <b> ASEAN FACTORI 4.0</b>
              <br><br>
              Instructors
              <ol>Prof. David Banjerdpongchai, Ph.D. (Head of Project) Department of Electrical Engineering Email: David.B@chula.ac.th</ol>
              <ol>Prof. Paisan Kittisupakorn Department of Chemical Engineering Email: Paisan.K@chula.ac.th</ol>
              <ol>Ph.D. Sirikanya Singcuna, M.S.Department of Chemical Engineering Email: Sirikanya.S@chula.ac.th</ol><br>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>



  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import image1 from '@/assets/1.jpg';
import image2 from '@/assets/2.jpg';
import image3 from '@/assets/3.jpg';
import image4 from '@/assets/4.jpg';

const images = ref([
  image1,
  image2,
  image3,
  image4
]);

function scrollTo(n){
  const element = document.getElementById(n);
element.scrollIntoView({
  behavior: "smooth",
  block: 'center'
});
}
</script>
