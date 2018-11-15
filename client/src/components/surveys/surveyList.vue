<template>
  <v-container grid-list-sm>
    <v-layout row wrap justify-center>
      <v-flex x12 md10 lg8>
        <v-card>
          <v-card-title primary-title class="headline">
            Available Surveys
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <div>
                <v-list-tile
                  avatar
                  class="my-3"
                >
                  <v-list-tile-action>
                    <v-avatar color="teal" class="mr-4">
                      <span class="white--text headline">S</span>
                    </v-avatar>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>User Experience Survey</v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-chip outline color="red lighten-2" text-color="red lighten-2" @click="$router.push('/surveys/sample')" style="cursor: pointer;">
                      <v-avatar>
                        <v-icon>remove_circle</v-icon>
                      </v-avatar>
                      Answer
                    </v-chip>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider light></v-divider>
              </div>
            </v-list>
          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {}
</script>

<style>
</style>
