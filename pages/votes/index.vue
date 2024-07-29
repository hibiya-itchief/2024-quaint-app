<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <ToolsBackButton></ToolsBackButton>
        <h1 class="info-title">投票</h1>

        <v-card>
          <v-list>
            <v-list-item
              v-for="group of saw_groups"
              :key="group.id"
              :title="group.title"
              :subtitle="group.groupname"
            >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Group, Ticket } from '~/types/quaint'

type Data = {
  saw_groups: Group[]
  taken_tickets: Ticket[]
}

export default Vue.extend({
  data(): Data {
    return {
      saw_groups: [],
      taken_tickets: [],
    }
  },

  async created() {
    this.taken_tickets = await this.$axios.$get('/users/me/tickets')

    for (const ticket of this.taken_tickets as Ticket[]) {
      const group = await this.$axios.$get('/groups/' + ticket.group_id)
      if (group.enable_vote) {
        this.saw_groups.push(group)
      }
    }
  },
})
</script>
