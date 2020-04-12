 <template>
  <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-default">
                <div class="card-header">Index Component</div>

                <div class="card-body">
                    <table class="table table-hover">
                      <thead>
                      <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th colspan="2">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr v-for="dialog in dialogs" :key="dialog.id">
                            <td>{{ dialog.req }}</td>
                            <td>{{ dialog.res }}</td>
                            <td class="text-right"><router-link :to="{name: 'edit', params: { id: dialog.id }}" class="btn btn-primary">Edit</router-link></td>
                            <td><button @click.prevent="deletePost(dialog._id)" class="btn btn-danger">Delete</button></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
  </div>
 </template>

 <script>
  export default {
      data() {
        return {
          dialogs: []
        }
      },
      created() {
      let uri = 'http://localhost:4000/dialogs';
      this.axios.get(uri).then(response => {
        this.dialogs = response.data;
      });
    },
    methods: {
      deletePost(id)
      {
        let uri = `http://localhost:4000/dialogs/delete/${id}`;
        this.axios.delete(uri).then(response => {
          this.dialogs.splice(this.dialogs.indexOf(id), 1);
          console.log(response)
        });
      }
    }
  }
</script>