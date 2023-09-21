describe('GraphQL API Query Test', () => {
    it('should validate cappedAvailableTimes', () => {
      // Load the query payload from the fixture file
      cy.fixture('availableTimesPayload.json').then((queryPayload) => {
        // Perform the GraphQL API call
        cy.request({
          url: 'https://henry-dev.hasura.app/v1/graphql',
          method: 'POST',
          body: queryPayload,
          headers: {
            'Content-Type': 'application/json'
            // include additional headers if required (like Authorization)
          }
        }).then((response) => {
          // Validate the response
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('cappedAvailableTimes');
          expect(response.body.data.cappedAvailableTimes).to.have.length.gte(5);  // At least 5 time entries
  
          // Further validation on each array element
          response.body.data.cappedAvailableTimes.forEach((item: any) => {
            expect(item).to.have.property('startTime');
            expect(item).to.have.property('endTime');
            expect(item).to.have.property('provider');
            expect(item.provider).to.have.property('id');
            expect(item.provider).to.have.property('displayName');
          });
        });
      });

      console.log("The test has completed.")
    });
  });