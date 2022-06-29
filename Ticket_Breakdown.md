# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Feature: As a Facility Manager, I would like to add a custom ID to every agent

    Scenario: Allow Facility Manager to add custom ids to a selected agent
        Given Agent exist in the database
        When Facility Manager selects a given agent to edit by tapping the edit button
        And the website prompts the user with a dialog box containing all the agent's fields
        Then the user is displayed (listed among) with a text field with a place holder 'Custom ID'

    Scenario: Verify Facility Manager is warned when setting a custom ID
        Given Facility Manager has executed 'Allow Facilities to add custom ids to a selected agent'
        When Facility Manager taps the update button
        Then the website tells the user "Custom ID cannot be modified once set'

    Scenario: Verify Facility Manager cannot modify custom ID once set
        Given Facility Manager has executed 'Allow Facilities to add custom ids to a selected agent'
        And custom ID contains a value (has been previously set)
        Then the website disables the textfield containing the previously filled custom ID

    Scenario: As a Facility Manager, I would like to generate a report by only agent's custom ID
        Given User has executed the scenario " As a Facility Manager I would like to add a custom ID to every agent
        When User hits report on the dashboard
        Then the website generates a PDF report containing only agent's custom ID

Estimate Metrics
- 2 - Quick: an hour or less
- 4 - Ok: a few hours
- 6 - Moderate: a day
- 8 - Difficult: more than a day

Estimates
    Ok(4): Allow Facility Manager to add custom ids to a selected agent
    Quick(2): Verify Facility Manager cannot modify custom ID once set
    Quick(2): Verify Facility Manager cannot modify custom ID once set
    Ok(4): As a Facility Manager, I would like to generate a report by only agent's custom ID

